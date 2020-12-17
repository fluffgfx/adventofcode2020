-- Helper Functions
notNullTuple :: [(a1, [a2])] -> [(a1, [a2])]
notNullTuple = filter (not . null . snd)

joinHead :: (a, [a]) -> [a]
joinHead a = snd a ++ [fst a]

lookingFor x a = x - a

numsFromInput i = map read (lines i) :: [Int]

-- IMPLEMENTATION 1:
-- O(n^2) complexity for part 1
-- O(n^4) complexity for part 2
-- A pretty hacky one, learning Haskell and trying to think functionally.
-- Want to improve on this complexity-wise.

-- O(n^2) complexity
tripleSumFinder n nums = 
    joinHead $
    head $
        notNullTuple (map (\a -> (a, sumFinder (n - a) nums)) nums)

-- O(n^2) complexity
sumFinder n nums =
    let allSeek = map (lookingFor n) nums
    in  filter (`elem` allSeek) nums

findTriple input = show $ product $ tripleSumFinder 2020 (numsFromInput input)

findDouble input = show $ product $ sumFinder 2020 (numsFromInput input)

-- Usage: cat ./input.txt | ./main
main = interact findTriple